export const medicalDisclaimer =
  "Les informations proposees sont issues de traditions de bien-etre et de lithotherapie. Elles ne remplacent pas un avis medical, un diagnostic ou un traitement professionnel.";

const forbiddenTerms = ["guerir", "soigner", "traiter une maladie", "remplacer un medecin"];

export function assertCompliantCopy(value: string) {
  const lower = value.toLowerCase();
  return !forbiddenTerms.some((term) => lower.includes(term));
}
