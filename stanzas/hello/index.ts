export default async function hello(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters: {
      greeting: `Hello, ${params["say-to"]}!`,
    },
  });
}

interface StanzaParameters {
  "say-to": string;
}

interface TemplateParameters {
  greeting: string;
}
