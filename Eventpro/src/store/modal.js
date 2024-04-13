import { makeAutoObservable, runInAction } from 'mobx'

class Modal {
  status = {
    success: false,
    error: false,
    wait: false,
    warn: false,
    deposit: false,
    redeem: false,
    addliquidity: false,
    removeliquidity: false,
    sellyes: false,
    sellno: false,
  }

  content = {
    success: 'Success!',
    error: 'Error!',
    wait: 'Waiting...',
    warn: 'Error!',
  }

  constructor() {
    makeAutoObservable(this)
  }

  open = (method, args) => {
    runInAction(() => {
      this.status[method] = true
    })
    switch (method) {
      case 'wait':
      case 'warn':
      case 'error':
      case 'success':
        this.content[method] = args
        break
      default:
    }
  }
  close = (method, args) => {
    runInAction(() => {
      this.status[method] = false
    })
  }
}

export default new Modal()
