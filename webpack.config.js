const path = require("path"); // 3) подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // подключаем к проекту mini-css-extract-plugin

module.exports = {
  entry: { main: "./src/pages/index.js" }, //  1) указали первое место, куда заглянет webpack, — файл pages/index.js в папке src
  output: {
    // указали в какой файл будет собираться весь js и дали ему имя
    path: path.resolve(__dirname, "dist"), // 2) переписали точку выхода, используя утилиту path
    filename: "main.js", // выходной файл
    publicPath: "",
  },
  mode: "development", // 4) добавили режим разработчика
  devServer: {
    // 5)
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    // 6)
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: "babel-loader", // при обработке этих файлов нужно использовать babel-loader
        exclude: "/node_modules/", // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями (изображения и шрифты)
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },

      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          // Добавьте postcss-loader
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    // добавьте массив
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин - Настраивать его не потребуется, достаточно вызвать
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
