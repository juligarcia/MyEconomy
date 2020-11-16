export const getTotal = payments => 
  payments.reduce((acc, payment) => {
    if(payment.instalments === 1)
      return acc + payment.paymentTotal
    return acc + payment.paymentTotal / payment.instalments;
  }, 0);