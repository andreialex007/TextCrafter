import { makeAutoObservable } from "mobx"

class PanelStore {
  isOpen = false
  selectedText = ""

  constructor() {
    makeAutoObservable(this)
  }

  togglePanel(text?: string) {
    this.isOpen = !this.isOpen
    if (text) this.selectedText = text
  }
}

export const panelStore = new PanelStore()