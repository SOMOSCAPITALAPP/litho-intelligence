export const medicalDisclaimer =
  "Les informations proposées sont issues de traditions de bien-être et de lithothérapie. Elles ne remplacent pas un avis médical, un diagnostic ou un traitement professionnel.";

const forbiddenTerms = ["guérir", "guerir", "soigner", "traiter une maladie", "remplacer un médecin", "remplacer un medecin"];

export function assertCompliantCopy(value: string) {
  const lower = value.toLowerCase();
  return !forbiddenTerms.some((term) => lower.includes(term));
}
