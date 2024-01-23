import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelinesStage } from './PipelineStage';


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'TRaiPipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('tulsirai/cdk-cicd', 'main'),
        commands: [
          // 'cd cdk-cicd',
          'npm ci',
          'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk.out'
      })
    });
    const testStage = pipeline.addStage(new PipelinesStage(this, 'PipelineTestStage', {
      stageName: 'test'
    }))
  }
}
