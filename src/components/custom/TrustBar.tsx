import { Shield, Truck, Award, Leaf, Star } from 'lucide-react';

const trustItems = [
    { icon: Star, text: '5.0 / 47 Reviews' },
    { icon: Shield, text: 'Third-Party Tested' },
    { icon: Truck, text: 'Free Ship Over $120' },
    { icon: Award, text: 'Patented UST™ Tech' },
    { icon: Leaf, text: '10% to GARMN' },
];

export function TrustBar() {
    return (
        <div className="trust-bar overflow-x-auto" role="region" aria-label="Trust and quality indicators">
            <div className="flex items-center gap-0 min-w-max mx-auto">
                {trustItems.map((item, idx) => (
                    <div key={item.text} className="flex items-center">
                        <div className="trust-item">
                            <item.icon className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{item.text}</span>
                        </div>
                        {idx < trustItems.length - 1 && (
                            <div className="trust-divider mx-4" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
