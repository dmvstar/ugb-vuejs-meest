SELECT
    t.ClientId AS externalClientId,
    tr.RetrievalData AS transactionId --, tr.TransactionDate    AS  dateTimeUtcTransaction
,
    CONVERT(VARCHAR(64), tr.TransactionDate, 126) AS dateTimeUtcTransaction,
    tr.AcceptorId AS merchantId,
    tr.TerminalId AS terminalId,
    a.Moniker AS clientAccountNumber,
    tr.Pan AS clientCardNumber,
    tr.TransactionAmount AS amountTransaction,
    '' + TransactionCode + FromAccountType + ToAccountType AS transactionTypeId,
    tr.AcceptorCode AS mccCode --,tr.* 
FROM
    Transactions tr (NOLOCK)
    LEFT JOIN TreatyCards tc (NOLOCK) ON tc.CardId = tr.CardIdCode
    LEFT JOIN Treaty t (NOLOCK) ON t.Id = tc.TreatyId
    LEFT JOIN Amounts a (NOLOCK) ON a.Id = t.AmountId
WHERE
    1 = 1
    AND TR.TransactionDate BETWEEN '{{from}}'
    AND '{{to}}'
    AND tr.TransactionAmount > 0
    AND tr.AuthorizationFlag = 1
    AND tr.ActionCode < 100
    AND tr.AcceptorId IN ({ { { merchantsText } } })