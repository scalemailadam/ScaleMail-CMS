import type { Schema, Struct } from '@strapi/strapi';

export interface ContentBrowserContent extends Struct.ComponentSchema {
  collectionName: 'components_content_browser_contents';
  info: {
    displayName: 'BrowserContent';
    icon: 'apps';
  };
  attributes: {};
}

export interface ContentContentItems extends Struct.ComponentSchema {
  collectionName: 'components_content_content_items';
  info: {
    displayName: 'contentItems';
    icon: 'attachment';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface FolderItemItems extends Struct.ComponentSchema {
  collectionName: 'components_folder_item_items';
  info: {
    description: '';
    displayName: 'items';
    icon: 'calendar';
  };
  attributes: {
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    reactIcon: Schema.Attribute.String;
    reactIconColor: Schema.Attribute.String;
    subItem: Schema.Attribute.Component<'navigation.items', true>;
    Title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationDockItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_dock_items';
  info: {
    description: '';
    displayName: 'DockItem';
    icon: 'oneToOne';
  };
  attributes: {
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    reactIconColor: Schema.Attribute.String;
    reactIconName: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationItems extends Struct.ComponentSchema {
  collectionName: 'components_navigation_items';
  info: {
    description: '';
    displayName: 'items';
    icon: 'dashboard';
  };
  attributes: {
    contentItems: Schema.Attribute.Component<'content.content-items', false>;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface NavigationMenu extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menus';
  info: {
    description: '';
    displayName: 'Menu';
    icon: 'stack';
  };
  attributes: {
    items: Schema.Attribute.Component<'navigation.items', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'MenuItem';
    icon: 'apps';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_navigation_social_links';
  info: {
    description: '';
    displayName: 'socialLinks';
    icon: 'link';
  };
  attributes: {
    iconName: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallery_sections';
  info: {
    description: '';
    displayName: 'GallerySection';
    icon: 'apps';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    columns: Schema.Attribute.Integer;
    gap: Schema.Attribute.Integer;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    rows: Schema.Attribute.Integer;
  };
}

export interface SectionsHeadingSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_heading_sections';
  info: {
    description: '';
    displayName: 'HeadingSection';
    icon: 'bulletList';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    color: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    textSize: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    >;
  };
}

export interface SectionsImageSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_sections';
  info: {
    description: '';
    displayName: 'ImageSection';
    icon: 'crop';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    height: Schema.Attribute.Integer;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    width: Schema.Attribute.Integer;
  };
}

export interface SectionsRichTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_text_sections';
  info: {
    description: '';
    displayName: 'RichTextSection';
    icon: 'code';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    paragraphText: Schema.Attribute.Blocks;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
  };
}

export interface SectionsSectionGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_groups';
  info: {
    description: '';
    displayName: 'SectionGroup';
    icon: 'apps';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.browser-content': ContentBrowserContent;
      'content.content-items': ContentContentItems;
      'folder-item.items': FolderItemItems;
      'navigation.dock-item': NavigationDockItem;
      'navigation.items': NavigationItems;
      'navigation.menu': NavigationMenu;
      'navigation.menu-item': NavigationMenuItem;
      'navigation.social-links': NavigationSocialLinks;
      'sections.gallery-section': SectionsGallerySection;
      'sections.heading-section': SectionsHeadingSection;
      'sections.image-section': SectionsImageSection;
      'sections.rich-text-section': SectionsRichTextSection;
      'sections.section-group': SectionsSectionGroup;
    }
  }
}
