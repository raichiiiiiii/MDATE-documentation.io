import { Redirect } from 'expo-router';

export const LATEST_VERSION = 'v0.1';

export default function RequirementsIndex() {
  return (
    <Redirect href={`/requirements/${LATEST_VERSION}`} />
  );
}
