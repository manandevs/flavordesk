import { getFilterOptions } from "@/actions/get-filter-options";
import getProducts from "@/actions/get-products";
import Box from "@/components/box";
import Container from "@/components/container";
import FilterContainer from "@/components/filter-container";
import FilterGroup from "@/components/menu/filter-group";
import PageContent from "@/components/menu/page-content";
import { Category, Size, Kitchen, Cuisine } from "@/types-db";
import React from "react";

export const revalidate = 0;

interface MenuPageProps {
  searchParams: {
    size?: string;
    isFeatured?: string;
    category?: string;
    kitchen?: string;
    cuisine?: string;
  };
}

const MenuPage: React.FC<MenuPageProps> = async ({ searchParams }) => {
  const query = {
    size: searchParams.size,
    category: searchParams.category,
    kitchen: searchParams.kitchen,
    cuisine: searchParams.cuisine,
    isFeatured:
      searchParams.isFeatured === "true"
        ? true
        : searchParams.isFeatured === "false"
        ? false
        : undefined,
  };

  const products = await getProducts(query);
  const categories: Category[] = await getFilterOptions<Category>("categories");
  const sizes: Size[] = await getFilterOptions<Size>("sizes");
  const kitchens: Kitchen[] = await getFilterOptions<Kitchen>("kitchens");
  const cuisines: Cuisine[] = await getFilterOptions<Cuisine>("cuisines");

  return (
    <Container>
      <section className="grid grid-cols-12 gap-2 px-4 sm:px-6 lg:px-12 pt-16 md:pt-28">
        <div className="hidden md:block col-span-2">
          <FilterContainer className="pb-16 gap-0">
            <FilterGroup
              label="Categories"
              options={categories.map((c) => c.name)}
              paramName="category"
            />
            <FilterGroup
              label="Sizes"
              options={sizes.map((s) => s.name)}
              paramName="size"
            />
            <FilterGroup
              label="Kitchens"
              options={kitchens.map((k) => k.name)}
              paramName="kitchen"
            />
            <FilterGroup
              label="Cuisines"
              options={cuisines.map((c) => c.name)}
              paramName="cuisine"
            />
          </FilterContainer>
        </div>

        <Box className="col-span-12 md:col-span-10 flex-col justify-start items-start">
          {/* Products are now pre-filtered */}
          <PageContent products={products} />
        </Box>
      </section>
    </Container>
  );
};

export default MenuPage;