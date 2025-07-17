// Import the DNS module
import dns from 'dns'

// Example usage
dns.lookup('example.com', (err, address, family) => {
  if (err) throw err;
  console.log(`Resolved: ${address} (IPv${family})`);
});