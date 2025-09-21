import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Tag, ExternalLink, Copy, Clock, Award, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  id: string;
  provider: string;
  certification: string;
  category: string;
  discount: string;
  code: string;
  description: string;
  validUntil: string;
  originalPrice: string;
  discountedPrice: string;
  features: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  logo?: string;
}

interface DiscountsProps {
  coupons?: Coupon[];
  onRedeemCoupon?: (couponId: string) => void;
}

const categories = [
  "All Categories",
  "Cloud Computing", 
  "Data Analytics",
  "Database",
  "Networking",
  "Project Management", 
  "Human Resources",
  "Business Analysis",
  "IT Security"
];

const providers = [
  "All Providers",
  "SAS",
  "Oracle", 
  "IBM",
  "Cisco",
  "Microsoft",
  "Amazon",
  "Google",
  "PMI",
  "SHRM"
];

export default function Discounts({ coupons = [], onRedeemCoupon }: DiscountsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedProvider, setSelectedProvider] = useState("All Providers");
  const { toast } = useToast();

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.certification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || coupon.category === selectedCategory;
    const matchesProvider = selectedProvider === "All Providers" || coupon.provider === selectedProvider;
    return matchesSearch && matchesCategory && matchesProvider;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `Coupon code "${code}" copied to clipboard`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="title-discounts">Professional Certification Discounts</h1>
        <p className="text-muted-foreground">Get exclusive discounts on industry-leading professional certifications</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certifications, providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-coupons"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-48" data-testid="select-provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground" data-testid="results-count">
          {filteredCoupons.length} certifications available
        </p>
      </div>

      {/* Coupons Grid */}
      {filteredCoupons.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">No certifications found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className="hover-elevate" data-testid={`coupon-card-${coupon.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <Badge variant="outline" data-testid={`coupon-provider-${coupon.id}`}>
                        {coupon.provider}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2" data-testid={`coupon-title-${coupon.id}`}>
                      {coupon.certification}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {coupon.category}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-700 font-bold">
                    {coupon.discount}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {coupon.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600" data-testid={`coupon-price-${coupon.id}`}>
                      {coupon.discountedPrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {coupon.originalPrice}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getDifficultyColor(coupon.difficulty)}>
                        {coupon.difficulty}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {coupon.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                      {coupon.features.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{coupon.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Coupon Code</div>
                        <div className="font-mono font-bold" data-testid={`coupon-code-${coupon.id}`}>
                          {coupon.code}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(coupon.code)}
                        data-testid={`button-copy-${coupon.id}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Valid until {coupon.validUntil}</span>
                  </div>

                  {/* Action */}
                  <Button
                    className="w-full"
                    onClick={() => onRedeemCoupon?.(coupon.id)}
                    data-testid={`button-redeem-${coupon.id}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Redeem Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}