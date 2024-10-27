import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VitasSnsCdkStack } from "../lib/vitas-sns-cdk-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region: process.env.CDK_DEFAULT_REGION || "sa-east-1",
};

new VitasSnsCdkStack(app, "VitasSnsStack", {
  emailAddress: "abarrantesvasquez@gmail.com",
  webhookUrl: "https://vitas-fawn.vercel.app/api/webhook",
  env: env,
  description: "Stack for SNS notifications",
});
