# TogoMedium Stanza

## About
このレポジトリは togomedium.org で使用しているスタンザ一式を格納しています。

## Build
基本的なコンセプトは https://github.com/togostanza/togostanza を参照してください。

### .env
APIの参照先をコントロールするために dotenv を使用しています。  
`.env` ファイルを作成し、以下のように記述してください。
```
URL_API=http://togomedium.org/sparqlist/api/
```
また、github actions でビルドを行うために同様の Repository Secretsを設定する必要があります。

## Develop
一部を除いて、本プロジェクトのStanzaはTypeScript&Reactで記述されています。Storybookを採用することにより、Stanzaのビルドを行うことなく開発をすすめることができます。
```
npm run storybook
```

