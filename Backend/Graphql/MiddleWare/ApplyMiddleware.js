const ApplyMiddlewares = (middlewares, resolver) => {
    return middlewares.reduceRight(
      (next, middleware) => middleware(next),
      resolver
    );
  };
  
  module.exports = ApplyMiddlewares;
  