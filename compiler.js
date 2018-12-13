/**
 * Created by fajar on 05/04/2018.
 *
 * Single file webpack and gulp config cover all
 * environment production or development with
 * purpose for client side app only
 */

const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);
const assetsPath = (file) => path.posix.join('assets', file || '');

if (process.env.BUNDLE) {
  const hasIdentity = "library_site";

  const gulp = require('gulp');
  const gulpConcat = require('gulp-concat');
  const gulpRename = require('gulp-rename');
  const gulpUglify = require('gulp-uglify');
  const gulpCleanCSS = require('gulp-clean-css');

  const inputCSS = [
    resolve('vendor/**/*.css')
  ];

  const inputJS = [
    resolve('vendor/js/jquery.min.js'),
    resolve('vendor/js/jquery.migrate.min.js'),
    resolve('vendor/**/*.js')
  ];

  gulp.task('bundle js', () => gulp.src(inputJS)
    .pipe(gulpConcat('vendor.js'))
    .pipe(gulpRename('vendor.' + hasIdentity + '.min.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(assetsPath('js'))));

  gulp.task('bundle css', () => gulp.src(inputCSS)
    .pipe(gulpConcat('vendor.css'))
    .pipe(gulpRename('vendor.' + hasIdentity + '.min.css'))
    .pipe(gulpCleanCSS({
      level: {1: {specialComments: false}},
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(assetsPath('css'))));

  gulp.task('default', ['bundle js', 'bundle css']);
} else {
  process.noDeprecation = true;

  const configuration = (env) => {
    const webpack = require('webpack');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

    const environmentPath = path.resolve(__dirname, 'src/config/environment');
    const environment = (env && env.NODE_ENV ? env.NODE_ENV : 'production');
    const isDevelopment = environment === 'development';
    const isStaging = process.env.STAGING || false;

    if (isStaging) {
      console.info("Running in staging with " + environment + " mode")
    }

    const cssLoaders = (options) => {
      options = options || {};
      const generateLoaders = (loader, loaderOptions = {}) => {
        const loaders = [{
          loader: 'css-loader',
          options: {
            minimize: !isDevelopment,
            sourceMap: options.sourceMap
          }
        }];

        if (loader) {
          loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {
              minimize: !isDevelopment,
              sourceMap: options.sourceMap,
              extract: options.extract
            })
          });
        }

        if (options.extract) {
          return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
          });
        } else {
          return ['vue-style-loader'].concat(loaders);
        }
      };

      return {
        css: generateLoaders(),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass')
      }
    };

    const watchFix = () => {
      return {
        apply: (compiler) => {
          const timefix = 11000;
          compiler.plugin('watch-run', (watching, callback) => {
            watching.startTime += timefix;
            callback();
          });

          compiler.plugin('done', (stats) => stats.startTime -= timefix);
        }
      }
    };

    return {
      entry: {
        app: !isDevelopment ? [resolve('src/App.ts')]
          : [resolve('src/App.ts'), "webpack-hot-middleware/client?noInfo=true&reload=true"]
      },
      stats: 'errors-only',
      devtool: isDevelopment ? 'eval' : 'none',
      output: {
        publicPath: '/',
        path: resolve('./dist'),
        filename: assetsPath('js/[name].[hash].js'),
        chunkFilename: assetsPath('js/[name].[chunkhash].js')
      },
      resolve: {
        alias: {
          'window': 'window',
          '$': "window.$",
          "jQuery": "window.$",
          'vue$': 'vue/dist/vue.js',
          'typescript-ioc': 'typescript-ioc/es6',

          // declare here to simple import without need path
          'annotation': path.resolve(__dirname, 'src/util/Annotation.ts'),

          // prevent all environment profile to expose in bundle
          'environment': isStaging ? (environmentPath + '/Staging.ts') : isDevelopment ?
            (environmentPath + '/Development.ts') : (environmentPath + '/Production.ts')
        },
        extensions: ['.vue', '.js', '.ts', '.html'],
        modules: [resolve('src'), resolve('node_modules')]
      },
      module: {
        noParse: /es6-promise\.js$/,
        rules: [
          {
            test: /\.ts$/, loader: 'awesome-typescript-loader',
            include: [resolve('src')], exclude: /node_modules/,
            options: {configFileName: 'tsconfig.json', appendTsSuffixTo: [/\.vue$/]}
          },
          {
            test: /\.html/, loader: 'raw-loader',
            exclude: [resolve('./src/Index.html'), '/node_modules/']
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              esModule: true,
              extractCSS: true,
              preserveWhitespace: false,
              loaders: Object.assign(
                {ts: 'awesome-typescript-loader'},
                cssLoaders({
                  sourceMap: false,
                  extract: true
                })
              ),
              transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: 'xlink:href'
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader',
            options: {limit: 10000, name: assetsPath('img/[name].[hash:7].[ext]')}
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, loader: 'url-loader',
            options: {limit: 10000, name: assetsPath('media/[name].[hash:7].[ext]')}
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url-loader',
            options: {limit: 10000, name: assetsPath('fonts/[name].[hash:7].[ext]')}
          }
        ].concat((() => {
          const output = [];
          const loaders = cssLoaders({
            sourceMap: false,
            extract: true
          });

          for (const extension in loaders) {
            if (loaders.hasOwnProperty(extension)) {
              const loader = loaders[extension];
              output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
              });
            }
          }

          return output;
        })())
      },
      performance: {
        maxEntrypointSize: 300000,
        hints: false
      },
      plugins: (() => {
        const plugins = [
          new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^en/),
          new FriendlyErrorsPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(environment),
            'process.env.VUE_ENV': '"client"'
          }),
          new ExtractTextPlugin({
            filename: assetsPath('css/[name].[contenthash].css'),
            allChunks: true
          }),
          new HtmlWebpackPlugin({
            filename: resolve('dist/index.html'),
            template: resolve('src/App.html'),
            inject: true,
            chunksSortMode: 'dependency',
            minify: {
              removeComments: !isDevelopment,
              collapseWhitespace: !isDevelopment
            }
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => (/node_modules/.test(module.context) &&
              !/\.css$/.test(module.request))
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
            chunks: ['vendor']
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
          })
        ];

        if (!isDevelopment) {
          plugins.push(
            new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false,
              stats: {colors: true}
            }),
            new OptimizeCSSPlugin({
              cssProcessorOptions: {
                map: {inline: false},
                safe: true
              }
            }),
            new CopyWebpackPlugin([{
              from: resolve('assets'),
              to: 'assets',
              ignore: ['.*']
            }]),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new UglifyJSPlugin({
              sourceMap: false,
              uglifyOptions: {
                output: {comments: false},
                warnings: false,
                parallel: true,
                compress: {
                  warnings: false,
                  drop_console: false
                }
              }
            })
          );
        } else {
          plugins.push(
            watchFix(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
          );
        }

        return plugins;
      })()
    };
  };

  if (process.env.SERVING) {
    const express = require("express");
    const app = express();

    let template = null;

    const config = configuration(process.env);
    const compiler = require("webpack")([config]);
    const devMiddleware = require("webpack-dev-middleware")(compiler, {logLevel: "silent", noInfo: true});
    const hotMiddleware = require("webpack-hot-middleware")(compiler, {heartbeat: 5000});

    compiler.plugin("done", () => {
      template = devMiddleware.fileSystem.readFileSync(path.join(config.output.path, "index.html"), "utf-8");
    });

    app.set("env", "production");
    app.set("x-powered-by", false);
    app.set("view cache", true);
    app.set("etag", false);

    app.locals.ENV = 'production';
    app.locals.ENV_DEVELOPMENT = false;

    app.use(hotMiddleware);
    app.use(devMiddleware);

    app.use('/assets', express.static(assetsPath(), {
      maxAge: 60 * 60 * 24,
      immutable: true,
      redirect: false,
      index: false,
      etag: false
    }));

    app.use((req, res) => {
      console.info(`- Page request ${req.originalUrl || req.url}`);
      console.info(`- IP client ` +
        `${req.headers['x-forwarded-for'] || req.connection.remoteAddress} at ${new Date()}\n`);

      try {
        res.setHeader("Content-Type", "text/html");

        return res.end(template ? template : "<title>Being compiling, reload immediate...</title>");
      } catch (e) {
        console.log(e);
      }

      return res.end("<title>Internal Server Error</title>");
    });

    app.listen((process.env.PORT || 8888), () => {
      console.log("\nPID#" + process.pid + ": Server started, listening at port " + (process.env.PORT || 8888));
    });
  } else {
    module.exports = configuration;
  }
}