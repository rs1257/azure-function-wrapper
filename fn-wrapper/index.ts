import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTriggerLoggerWrapper = function (
    fn: AzureFunction
  ): (...args: any[]) => Promise<void> {
    return async function(context: Context, req: HttpRequest) {
      try {
        context.log('Logging before function called');
        await fn(context, req);
        context.log('Logging after function called');
      } catch(error) {
        throw error;
      }
    };
  }

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    context.res = {
        body: 'OK'
    };

};

export default httpTriggerLoggerWrapper(httpTrigger);
