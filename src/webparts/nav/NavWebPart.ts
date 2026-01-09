import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp/presets/all';
import * as strings from 'NavWebPartStrings';
import Nav from './components/Nav';

export interface INavWebPartProps {
  description: string;
}

export default class NavWebPart
  extends BaseClientSideWebPart<INavWebPartProps> {

  protected async onInit(): Promise<void> {
    await super.onInit();

    // ✅ Correct PnP setup (NO casting)
    sp.setup({
      spfxContext: this.context as any
    });
  }

  public render(): void {
    const element = React.createElement(Nav, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
