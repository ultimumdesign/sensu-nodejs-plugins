
const AWS = require('aws-sdk')

const rds = new AWS.RDS()

const requiredEnv = {
  AWS_ACCESS_KEY_ID: 'id of aws pair',
  AWS_SECRET_ACCESS_KEY: 'secret of aws pair',
  AWS_REGION: 'region of the rds in aws',
  AWS_RDS_ARN: 'arn of the rds to check'
}

const rdsStatusMap = {
  // Sensu status: 0 = good, 1 = warning, 2 = critical
  available: 0,
  failed: 2
}

module.exports = async () => {
  Object.keys(requiredEnv).forEach(reqKey => {
    if (!process.env[reqKey]) {
      console.error(`Environment missing: ${reqKey}`)
      process.exit(2)
    }
  })
  try {
    const params = process.env.AWS_RDS_IS_CLUSTER
      ? {
        Filters: [{
          Name: 'db-cluster-id',
          Values: [process.env.AWS_RDS_ARN]
        }]
      }
      : { DBInstanceIdentifier: process.env.AWS_RDS_ARN }
    const data = await rds.describeDBInstances(params).promise()
    const ok = []
    const warnings = []
    const errors = []
    data.DBInstances.forEach(instance => {
      const rdsStatus = instance.DBInstanceStatus
      const status = rdsStatusMap[rdsStatus]
      switch (status) {
        case 0:
          ok.push(`${instance.DBInstanceIdentifier}:${rdsStatus}`)
          break
        case 1:
          warnings.push(`${instance.DBInstanceIdentifier}:${rdsStatus}`)
          break
        case 2:
          errors.push(`${instance.DBInstanceIdentifier}:${rdsStatus}`)
      }
    })
    if (errors.length) {
      console.error(errors.join(','))
      process.exit(2)
    } else if (warnings.length) {
      console.log(warnings.join(','))
      process.exit(1)
    }
    console.log(ok.join(','))
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(2)
  }
}
