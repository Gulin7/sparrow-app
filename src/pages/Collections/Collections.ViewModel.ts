/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TabDocument } from "$lib/database/app.database";
import { TabRepository } from "$lib/repositories/tab.repository";

export class CollectionsViewModel {
  private tabRepository = new TabRepository();
  constructor() {}

  get tabs() {
    return this.tabRepository.getTabList();
  }

  get activeTab() {
    return this.tabRepository.getTab();
  }

  public extractTabDocument = (doc: TabDocument) => {
    return this.tabRepository.extractTabDocument(doc);
  };
  public handleCreateTab = (data: any) => {
    this.tabRepository.createTab(data);
  };
  public handleRemoveTab = (id: string) => {
    this.tabRepository.removeTab(id);
  };
  public handleActiveTab = (id: string) => {
    this.tabRepository.activeTab(id);
  };
}
