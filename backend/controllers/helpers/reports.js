
const getReports = (subPopulated, additionalValues) => {
    const date = new Date()
    return {
            user : {// 1###
                accounts : { // 11##
                    createdAccount : {
                        code: '1101',
                        tenant: subPopulated.tenant.id,
                        msg: 'Account successfully created',
                        date,
                        additionalValues
                    }
                }
            },
            mail: { // 2###
                mailSent: { // 21##
                    mailSuccessfullySent: {
                        code: '2101',
                        tenant: subPopulated.tenant.id,
                        msg: 'Mail successfully sent',
                        date,
                        additionalValues
                    },
                    mailNotSend: {
                        mailSuccessfullySent: {
                            code: '2102',
                            tenant: subPopulated.tenant.id,
                            msg: 'Error sending mail',
                            date,
                            additionalValues
                        },
                    }
                }
            }
    }
}


module.exports = getReports