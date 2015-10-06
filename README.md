# matchbox-sqs

This program uses the [matchbox](http://github.com/FoundersAS/matchbox) module and exposes the interface over Amazon AWS SQS.

It expects the following three environment variable to be set.

`AWS_ACCESS`
`AWS_SECRET`
`AWS_REGION`

It has an inbound queue where it receives a message with the format documented in the matchbox module, and after it is done with
the matching, it pushes the results to an outbound queue in the following format.

```
{
  "id": "SOME-ID-YOU-PASSED-ON-THE-FIRST-MESSAGE",
  "transactions": [
    {
      "amount": "...",
      "text": "...",
      "date": "..."
      "matches": [... list of matched emails ...]
    }
  ]
}
```

The inbound queue's default name is `csv-to-match`. It can be changed by setting the INBOUND_QUEUE environment variable.
The outbound queue's default name is `matched-transactions`. It can be changed by setting the OUTBOUND_QUEUE environment variable.
