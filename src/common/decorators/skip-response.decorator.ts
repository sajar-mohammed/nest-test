import { SetMetadata } from "@nestjs/common";

export const SKIP_RESPONSE_METADATA = 'skipResponse';

export const SkipResponse = () => SetMetadata(SKIP_RESPONSE_METADATA, true);