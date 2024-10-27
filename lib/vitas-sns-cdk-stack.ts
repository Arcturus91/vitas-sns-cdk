import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";

interface VitasSnsCdkStackProps extends cdk.StackProps {
  emailAddress: string;
  webhookUrl: string;
}

export class VitasSnsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: VitasSnsCdkStackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, "NotificationTopic", {
      displayName: "Notification Topic",
    });

    topic.addSubscription(
      new subscriptions.EmailSubscription(props.emailAddress)
    );

    topic.addSubscription(
      new subscriptions.UrlSubscription(props.webhookUrl, {
        protocol: sns.SubscriptionProtocol.HTTPS,
      })
    );

    // Output the SNS Topic ARN
    new cdk.CfnOutput(this, "SNSTopicArn", {
      value: topic.topicArn,
      description: "ARN of the SNS Topic",
      exportName: "SNSTopicArn",
    });
  }
}
