import { shareImage } from "./share-image";

export const dynamic = "force-static";

export function GET() {
  return shareImage("en");
}
