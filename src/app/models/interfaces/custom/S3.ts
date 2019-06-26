export interface S3BucketParams {
  Bucket: string;
  CreateBucketConfiguration?: {
    LocationConstraint: string;
  };
  Key?: string;
}
