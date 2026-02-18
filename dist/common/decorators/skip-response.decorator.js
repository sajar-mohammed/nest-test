"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipResponse = exports.SKIP_RESPONSE_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.SKIP_RESPONSE_METADATA = 'skipResponse';
const SkipResponse = () => (0, common_1.SetMetadata)(exports.SKIP_RESPONSE_METADATA, true);
exports.SkipResponse = SkipResponse;
//# sourceMappingURL=skip-response.decorator.js.map