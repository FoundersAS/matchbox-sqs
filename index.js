import matchbox from 'matchbox';
import sqs from  'sqs';

const queue = sqs({
  access: process.env.AWS_ACCESS,
  secret: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
});

queue.pull('csv-to-match', function(msg, cb) {
  const id = msg.id;
  matchbox(msg, function(err, transactions) {
    if (err) {
      if (err.message === 'Invalid source.') return cb();
      return cb(err);
    }

    queue.push('matched-transactions', {id, transactions});
    cb();
  });
});
