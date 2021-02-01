import React from 'react'

export const Accounts = props => {
  const {accounts} = props
  return (
    <div>
      {accounts.length > 0
        ? accounts.map(account => {
            return (
              <div key={account.account_id}>
                <div>
                  {account.name}: {account.official_name}{' '}
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}
