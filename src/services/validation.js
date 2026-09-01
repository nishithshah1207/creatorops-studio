export async function validateJsonBody(req, requiredFields) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw Object.assign(new Error("Invalid JSON"), { statusCode: 400 });
  }

  const missingFields = requiredFields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missingFields.length > 0) {
    throw Object.assign(new Error(`Missing required fields: ${missingFields.join(", ")}`), {
      statusCode: 422
    });
  }

  return body;
}
