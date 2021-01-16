import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getCaterer?: Maybe<CatererProfile>;
  caterer?: Maybe<CatererProfile>;
  getOneMenu?: Maybe<MenuItem>;
};


export type QueryGetCatererArgs = {
  id: Scalars['String'];
};


export type QueryGetOneMenuArgs = {
  id: Scalars['String'];
};

export type CatererProfile = {
  __typename?: 'CatererProfile';
  id: Scalars['ID'];
  businessName: Scalars['String'];
  businessEmail: Scalars['String'];
  businessPhone: Scalars['String'];
  cuisines: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tagLine?: Maybe<Scalars['String']>;
  subaccount?: Maybe<SubAccount>;
  deliveryFee?: Maybe<Scalars['String']>;
  isApproved: Scalars['Boolean'];
  coverImage?: Maybe<Scalars['String']>;
  menuCategories?: Maybe<Array<MenuCategory>>;
  menuItems?: Maybe<Array<MenuItem>>;
  address?: Maybe<Address>;
};


export type SubAccount = {
  __typename?: 'SubAccount';
  id: Scalars['String'];
  bank_name: Scalars['String'];
  subaccount_id: Scalars['String'];
};

export type MenuCategory = {
  __typename?: 'MenuCategory';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  menuItems?: Maybe<Array<MenuItem>>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  singleServes: Scalars['Float'];
  pricePerPlate: Scalars['Float'];
  minimumOrderQty: Scalars['Float'];
  maximumOrderQty: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  vegetarian_option: Scalars['Boolean'];
  menuOptions?: Maybe<Array<MenuOption>>;
  images?: Maybe<Array<Image>>;
};

export type MenuOption = {
  __typename?: 'MenuOption';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  minimumChoice: Scalars['Float'];
  maximumChoice?: Maybe<Scalars['Float']>;
  useCheckBoxes?: Maybe<Scalars['Boolean']>;
  menuChoices?: Maybe<Array<MenuChoice>>;
};

export type MenuChoice = {
  __typename?: 'MenuChoice';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  choicePrice: Scalars['Float'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  format: Scalars['String'];
  src: Scalars['String'];
  entityId: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  countryCode: Scalars['String'];
  stateOrProvince: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMenuCategory?: Maybe<MenuCategory>;
  addMenuItems?: Maybe<MenuCategory>;
  createMenu?: Maybe<MenuItem>;
};


export type MutationCreateMenuCategoryArgs = {
  newRecord: MenuCategoryDto;
};


export type MutationAddMenuItemsArgs = {
  update: MenuCategoryUpdateDto;
};


export type MutationCreateMenuArgs = {
  newRecord: MenuItemDto;
};

export type MenuCategoryDto = {
  title: Scalars['String'];
};

export type MenuCategoryUpdateDto = {
  id: Scalars['String'];
  menuIds: Array<Scalars['String']>;
};

export type MenuItemDto = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  singleServes: Scalars['Float'];
  pricePerPlate: Scalars['Float'];
  vegetarian_option?: Maybe<Scalars['Boolean']>;
  minimumOrderQty: Scalars['Float'];
  maximumOrderQty?: Maybe<Scalars['Float']>;
  menuOptions?: Maybe<Array<MenuOptionDto>>;
};

export type MenuOptionDto = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  minimumChoice: Scalars['Float'];
  maximumChoice?: Maybe<Scalars['Float']>;
  menuItemId?: Maybe<Scalars['String']>;
  useCheckBoxes?: Maybe<Scalars['Boolean']>;
  menuChoices?: Maybe<Array<MenuChoiceDto>>;
};

export type MenuChoiceDto = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  choicePrice: Scalars['Float'];
  menuOptionId?: Maybe<Scalars['String']>;
};

export type CreateMenuMutationVariables = Exact<{
  newRecord: MenuItemDto;
}>;


export type CreateMenuMutation = (
  { __typename?: 'Mutation' }
  & { createMenu?: Maybe<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'id'>
  )> }
);

export type CatererQueryVariables = Exact<{ [key: string]: never; }>;


export type CatererQuery = (
  { __typename?: 'Query' }
  & { caterer?: Maybe<(
    { __typename?: 'CatererProfile' }
    & Pick<CatererProfile, 'id' | 'isApproved' | 'businessPhone' | 'businessEmail' | 'businessName' | 'deliveryFee' | 'coverImage' | 'cuisines' | 'tagLine' | 'createdAt' | 'updatedAt'>
    & { subaccount?: Maybe<(
      { __typename?: 'SubAccount' }
      & Pick<SubAccount, 'id' | 'subaccount_id'>
    )> }
  )> }
);

export type MenuItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type MenuItemsQuery = (
  { __typename?: 'Query' }
  & { caterer?: Maybe<(
    { __typename?: 'CatererProfile' }
    & { menuItems?: Maybe<Array<(
      { __typename?: 'MenuItem' }
      & Pick<MenuItem, 'id' | 'title' | 'description' | 'pricePerPlate' | 'maximumOrderQty' | 'minimumOrderQty' | 'singleServes' | 'vegetarian_option'>
      & { menuOptions?: Maybe<Array<(
        { __typename?: 'MenuOption' }
        & Pick<MenuOption, 'id' | 'title' | 'description' | 'useCheckBoxes' | 'maximumChoice'>
        & { menuChoices?: Maybe<Array<(
          { __typename?: 'MenuChoice' }
          & Pick<MenuChoice, 'id' | 'choicePrice' | 'name' | 'description'>
        )>> }
      )>> }
    )>> }
  )> }
);

export type MenuCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MenuCategoriesQuery = (
  { __typename?: 'Query' }
  & { caterer?: Maybe<(
    { __typename?: 'CatererProfile' }
    & { menuCategories?: Maybe<Array<(
      { __typename?: 'MenuCategory' }
      & Pick<MenuCategory, 'id' | 'title'>
      & { menuItems?: Maybe<Array<(
        { __typename?: 'MenuItem' }
        & Pick<MenuItem, 'id' | 'title' | 'description' | 'pricePerPlate' | 'maximumOrderQty' | 'minimumOrderQty' | 'singleServes' | 'vegetarian_option'>
      )>> }
    )>> }
  )> }
);


export const CreateMenuDocument = gql`
    mutation CreateMenu($newRecord: MenuItemDto!) {
  createMenu(newRecord: $newRecord) {
    id
  }
}
    `;

export function useCreateMenuMutation() {
  return Urql.useMutation<CreateMenuMutation, CreateMenuMutationVariables>(CreateMenuDocument);
};
export const CatererDocument = gql`
    query Caterer {
  caterer {
    id
    isApproved
    subaccount {
      id
      subaccount_id
    }
    businessPhone
    businessEmail
    businessName
    deliveryFee
    coverImage
    cuisines
    tagLine
    createdAt
    updatedAt
  }
}
    `;

export function useCatererQuery(options: Omit<Urql.UseQueryArgs<CatererQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CatererQuery>({ query: CatererDocument, ...options });
};
export const MenuItemsDocument = gql`
    query MenuItems {
  caterer {
    menuItems {
      id
      title
      description
      pricePerPlate
      maximumOrderQty
      minimumOrderQty
      singleServes
      vegetarian_option
      menuOptions {
        id
        title
        description
        useCheckBoxes
        maximumChoice
        menuChoices {
          id
          choicePrice
          name
          description
        }
      }
    }
  }
}
    `;

export function useMenuItemsQuery(options: Omit<Urql.UseQueryArgs<MenuItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MenuItemsQuery>({ query: MenuItemsDocument, ...options });
};
export const MenuCategoriesDocument = gql`
    query MenuCategories {
  caterer {
    menuCategories {
      id
      title
      menuItems {
        id
        title
        description
        pricePerPlate
        maximumOrderQty
        minimumOrderQty
        singleServes
        vegetarian_option
      }
    }
  }
}
    `;

export function useMenuCategoriesQuery(options: Omit<Urql.UseQueryArgs<MenuCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MenuCategoriesQuery>({ query: MenuCategoriesDocument, ...options });
};