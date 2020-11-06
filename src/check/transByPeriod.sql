SELECT TOP 10 t.ClientId AS recepient_id
            , tr.Pan AS FLD_002 -- PAN

            , '' + OperationCode + FromAccountType + ToAccountType AS FLD_003_O
            , '' + TransactionCode + FromAccountType + ToAccountType AS FLD_003_T
            , tr.TransactionAmount AS FLD_004
            , FORMAT(tr.TransactionDate, 'yyyyMMddHHmmssffff') AS FLD_007
            , tr.Stan AS FLD_011
            , FORMAT(tr.TransactionDate, 'yyyyMMddHHmmssffff') AS FLD_012
            , tr.AcceptorCode AS FLD_026 -- MCC

            , RetrievalData AS FLD_037
            , ApprovalCode AS FLD_038
            , TerminalId AS FLD_041
            , AcceptorId AS FLD_042
            , AcceptorCountry AS FLD_043
			/*
            , tr.RetrievalData AS transactionId --, tr.TransactionDate    AS  dateTimeUtcTransaction
            , CONVERT(VARCHAR(64), tr.TransactionDate, 126) AS dateTimeUtcTransaction
            , tr.AcceptorId AS merchantId
            , tr.TerminalId AS terminalId
            , a.Moniker AS clientAccountNumber
            , tr.TransactionAmount AS amountTransaction
            , '' + TransactionCode + FromAccountType + ToAccountType AS transactionTypeId
            */
			--, tr.*
FROM Transactions tr(NOLOCK)
     LEFT JOIN TreatyCards tc(NOLOCK) ON tc.CardId = tr.CardIdCode
     LEFT JOIN Treaty t(NOLOCK) ON t.Id = tc.TreatyId
     LEFT JOIN Amounts a(NOLOCK) ON a.Id = t.AmountId
WHERE 1 = 1
      AND tr.TransactionAmount > 0
      AND tr.AuthorizationFlag = 1
      AND tr.ActionCode < 100
ORDER BY tr.ID DESC;

--sp_helptext Transactions
--TransactionsOperative