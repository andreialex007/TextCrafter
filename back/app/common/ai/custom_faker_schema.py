from faker_schema.faker_schema import FakerSchema


class CustomFakerSchema(FakerSchema):
    def _generate_one_fake(self, schema):
        try:
            data = {}
            for key, value in schema.get("properties", {}).items():
                schema_type = value.get("type")

                if schema_type == "string":
                    data[key] = "example_string"
                elif schema_type == "integer":
                    data[key] = 0
                elif schema_type == "boolean":
                    data[key] = True
                elif schema_type == "array":
                    data[key] = ["example_item"]
                elif schema_type == "object":
                    data[key] = self._generate_one_fake(value)
                else:
                    data[key] = None
            return data
        except AttributeError:
            return super()._generate_one_fake(schema)
