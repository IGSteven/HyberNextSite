import React from 'react';
import Link from 'next/link';
import { getPartners } from '@/lib/partner-utils';
import { Partner } from '@/lib/partner-types';

export default async function AdminPartnersPage() {
  const { partners } = await getPartners();
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Partner Management</h1>
        <Link 
          href="/admin/partners/new" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded"
        >
          Add New Partner
        </Link>
      </div>
      
      <div className="bg-card border border-border shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Affiliate ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {partners.map((partner: Partner) => (
              <tr key={partner.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {partner.logoUrl ? (
                        <img className="h-10 w-10 object-contain" src={partner.logoUrl} alt={partner.name} />
                      ) : (
                        <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-full">
                          <span className="text-sm font-medium">{partner.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{partner.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{partner.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{partner.discount}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{partner.affiliateId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${partner.featured ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {partner.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin/partners/edit/${partner.slug}`} className="text-primary hover:text-primary/90 mr-4">
                    Edit
                  </Link>
                  <Link href={`/admin/partners/delete/${partner.slug}`} className="text-destructive hover:text-destructive/90">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
            
            {partners.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-center">
                  No partners found. Click "Add New Partner" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}