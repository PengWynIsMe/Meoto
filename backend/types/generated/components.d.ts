import type { Schema, Struct } from '@strapi/strapi';

export interface NavigationIco extends Struct.ComponentSchema {
  collectionName: 'components_navigation_icos';
  info: {
    displayName: 'icon';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'menu-item';
  };
  attributes: {
    IsActive: Schema.Attribute.Boolean;
    Label: Schema.Attribute.String;
    Link: Schema.Attribute.String;
    Order: Schema.Attribute.Integer;
    sub_items: Schema.Attribute.Component<'navigation.sub-menu-item', true>;
  };
}

export interface NavigationSubLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_sub_links';
  info: {
    displayName: 'sub-link';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface NavigationSubMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_sub_menu_items';
  info: {
    displayName: 'sub-menu-item';
  };
  attributes: {
    items: Schema.Attribute.Component<'navigation.sub-link', true>;
    section_title: Schema.Attribute.String;
  };
}

export interface SliderSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_sliders';
  info: {
    displayName: 'slider';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigation.ico': NavigationIco;
      'navigation.menu-item': NavigationMenuItem;
      'navigation.sub-link': NavigationSubLink;
      'navigation.sub-menu-item': NavigationSubMenuItem;
      'slider.slider': SliderSlider;
    }
  }
}
