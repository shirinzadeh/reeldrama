export function isValidEmail(email: string): boolean {
  // Basic email validation
  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(email)) return false;

  // Additional checks
  const [localPart, domain] = email.split('@');
  
  // Check local part
  if (localPart.length === 0 || localPart.length > 64) return false;
  
  // Check domain part
  if (domain.length < 4 || domain.length > 255) return false;
  
  // Check domain segments
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  // Check TLD (Top Level Domain)
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /\.\./, // consecutive dots
    /^\./, // starting with dot
    /\.$/, // ending with dot
    /^-/, // starting with hyphen
    /-$/, // ending with hyphen
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(domain));
}
