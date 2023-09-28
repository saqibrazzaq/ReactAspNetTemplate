using System.Text.Json;
using System.Text.Json.Serialization;

namespace api.Utility
{
    public class JsonStringGuidConverter : JsonConverter<Guid>
    {
        public override Guid Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {


            //DateTime date = DateTime.Parse(reader.GetString(), CultureInfo.GetCultureInfo("en-US"));

            string? value = reader.GetString();
            if (string.IsNullOrWhiteSpace(value) == true)
                return Guid.Empty;

            Guid result;
            var isValid = Guid.TryParse(value, out result);
            if (isValid == false)
                throw new InvalidDataException("Invalid Id: " + value);

            return result;
        }

        public override void Write(Utf8JsonWriter writer, Guid value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value);
        }
    }
}
