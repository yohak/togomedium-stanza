type StanzaInstance = {
  render: <TemplateParameters>(
    opts: StanzaRenderOptions<TemplateParameters>
  ) => void;
  query: <QueryResults, QueryOptionParameters>(
    opts: StanzaQueryOptions<QueryOptionParameters>
  ) => Promise<QueryResults>;
  importWebFontCSS: (url: string) => void;
  root: ShadowRoot;
};

type StanzaRenderOptions<TemplateParameters> = {
  template: string;
  parameters: TemplateParameters;
};

type StanzaQueryOptions<QueryOptionParameters> = {
  endpoint: string;
  template: string;
  parameters?: QueryOptionParameters;
};

type SimpleObject = { [key: string]: string | number };

type ApiResponse<T> = {
  status: number;
  message?: string;
  body: T;
};
