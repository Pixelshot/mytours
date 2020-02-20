const mongoose = require('mongoose');
const slugify = require('slugify');
// =======================================================================================
//                                      SCHEMA
// =======================================================================================

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
      trim: true
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
      required: [true, 'Tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price']
    },
    priceDiscount: Number,
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

// secretTour appears in general query
// tourSchema.pre('find', function(next) {

// secretTour does not appear in general query
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds!`);
  console.log(docs);
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
