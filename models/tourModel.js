const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

// =======================================================================================
//                                      SCHEMA
// =======================================================================================

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
      trim: true,
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      maxlength: [40, 'A tour name must have less or equal than 40 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      require: [true, 'Tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to the current doc when there's a NEW document creation
          return val < this.price;
        },
        message:
          'Discounted price ({VALUE}) should be lower than original price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// =======================================================================================
//                                 VIRTUAL PROPERTIES
// =======================================================================================

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// =======================================================================================
//                                      MODEL
// =======================================================================================

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not on insertMany()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE

// secretTour appears in public query
// tourSchema.pre('find', function(next) {

// secretTour does not appear in public query
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// ========================== Reference ===============================
// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// })

// // POST MIDDLEWARE
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// })
