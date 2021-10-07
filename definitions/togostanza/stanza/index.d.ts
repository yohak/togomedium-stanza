export default class Stanza<StanzaParams = any> {
  constructor();

  get root(): Document;

  get params(): StanzaParams;

  renderTemplate<TemplateParams>(params: RenderTemplateParams<TemplateParams>): void;

  menu(): void;

  importWebFontCSS(cssUrl: string): void;

  handleAttributeChange(): void;

  query(params: QueryParams): Promise<any>;
}
declare type RenderTemplateParams<TemplateParams> = {
  template: string;
  parameters?: TemplateParams;
  selector?: string;
};

declare type QueryParams = {
  template: string;
  parameters?: any;
  endpoint?: string;
  method?: "GET" | "POST";
};
export {};
