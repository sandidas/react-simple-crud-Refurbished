import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons';
import React from 'react';

const ProductSingleCard = ({ product }) => {

    const productCreate = new Date(product?.createdAt);



    return (
        <div>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section component="a" link="/">
                    <Image
                        src={product?.photoUrl}
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>
                        {product?.title}
                    </Text>
                    {product?.isAdvertise
                        &&
                        <Badge color="pink" variant="light">
                            Ad
                        </Badge>
                    }

                </Group>

                <div className='flex justify-between items-center border-b'>
                    <div className='text-sm'>
                        Location: {product?.location}
                    </div>
                    <div>
                        <span className='line-through text-xs pr-1'>${product?.originalPrice}</span>
                        <span>${product?.resalePrice}</span>
                    </div>
                </div>

                <div className='text-sm flex justify-end pb-2 items-center border-b'>
                    <span className='pr-1'> Sold by:  {product?.sellerName}  </span>
                    {product?.userVerified &&
                        <IconCheckbox size={15} color="blue" />}
                </div>

                <div className='text-sm flex justify-between pb-2 items-center border-b'>
                    <div>
                        <span className='pr-1'> <strong> {2022 - product?.yearOfPurchase} </strong> Years of Use </span>
                    </div>

                    <div>
                        Posted:   {productCreate.toDateString()}
                    </div>
                </div>

                <Text size="sm" color="dimmed">
                    With Fjord Tours you can explore more of
                </Text>


                <Button variant="light" color="blue" fullWidth mt="md" radius="md" link="/">
                    Book now
                </Button>
            </Card>
        </div>
    );
};

export default ProductSingleCard;