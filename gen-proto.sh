PROTO_DIR="./protos"
TS_OUTPUT_DIR="./generated/proto/ts"
JAVA_OUTPUT_DIR="./generated/proto/java"
PROTO_INCLUDE="/usr/include/google/protobuf"

# mkdir -p $TS_OUTPUT_DIR
# mkdir -p $JAVA_OUTPUT_DIR

# protoc \
#   --plugin=protoc-gen-ts_proto=node_modules/ts-proto/protoc-gen-ts_proto \
#   -I=${PROTO_INCLUDE} \
#   -I=${PROTO_DIR} \
#   --ts_proto_opt=outputEncodeMethods=true,useEnumNames=false,asClass=false,outputJsonMethods=true,context=true,outputNestJs=true,outputClientImpl=false \
#   --ts_proto_out=${TS_OUTPUT_DIR} \
#   --java_out=${JAVA_OUTPUT_DIR} \
#   ${PROTO_DIR}/*.proto

# # Generate TypeScript gRPC Stubs
# protoc \
#   -I=${PROTO_INCLUDE} \
#   -I=${PROTO_DIR} \
#   --ts_proto_out=$TS_OUTPUT_DIR \
#   --ts_proto_opt=esModuleInterop=true \
#   --ts_proto_opt=useOptionals=true \
#   --proto_path=$PROTO_DIR \
#   $PROTO_DIR/*.proto

# # Generate Java gRPC Stubs
# protoc \
#   -I=${PROTO_INCLUDE} \
#   -I=${PROTO_DIR} \
#   --grpc-java_out=$JAVA_OUTPUT_DIR \
#   --java_out=$JAVA_OUTPUT_DIR \
#   --proto_path=$PROTO_DIR \
#   $PROTO_DIR/*.proto

protoc \
  --plugin=protoc-gen-ts_proto=node_modules/ts-proto/protoc-gen-ts_proto \
  -I=${PROTO_INCLUDE} \
  -I=${PROTO_DIR} \
  --ts_proto_opt=outputEncodeMethods=true,useEnumNames=false,asClass=false,outputJsonMethods=true,context=true,outputNestJs=true,outputClientImpl=false \
  --ts_proto_out="libs/proto-schema/src/schema" \
  ${PROTO_DIR}/*.proto