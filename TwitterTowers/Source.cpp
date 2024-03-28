#include <stdio.h>
#include<minmax.h>
#include <malloc.h>
int main() {
    int x;
    int height, width, recHight = 0, recWidth = 0, trHight = 0, trWidth = 0;

    printf("Press 1 or 2 or 3: ");
    scanf_s("%d", &x);

    while (x == 1 || x == 2) {
        printf("Press height: ");
        scanf_s("%d", &height);
        printf("Press width: ");
        scanf_s("%d", &width);
        if (x == 1)
        {
            recHight += height;
            recWidth += width;
        }
        else {
            trHight += height;
            trWidth += width;
        }
        printf("\n Press 1 or 2 or 3: ");
        scanf_s("%d", &x);
    }
    if (recHight == recWidth || max(recHight, recWidth) - min(recHight, recWidth) > 5)
    {
        printf("The area of the rectangle %d \n", recHight * recWidth);
    }
    else
    {
        printf("The scope of the rectangle %d \n", recHight * 2 + recWidth * 2);

    }
    char r;
    printf("Calculate the perimeter of a triangle? press y/n ");
    scanf_s(" %c", &r);
    if (r == 'y')
    {
        printf("The scope of the triangle %d \n", trWidth + (trHight * 2));
        main();
    }
    if (r == 'n')
    {
        if (trWidth % 2 == 0 || trHight > (trWidth * 2) )
        {
            printf("The data is incorrect \n");
            main();
        }
        if (trWidth == 3)
        {
            printf(" *\n");
            for (int i = 0; i < trHight - 1; i++)
            {
                printf("***\n");
            }
            main();
        }
        int count = 1;
        int numJump = trWidth/ 2 -1;
        int numLine = trHight - 2;
        int equalLine = (int)numLine / numJump;
        int d1 = equalLine;

        if (numLine % numJump != 0)
        {
            d1 += numLine % numJump;

        }
        for (int i = 0; i < trWidth / 2; i++)
        {
            printf(" ");
        }
        printf("*\n");
        for (size_t i = 0; i < (trHight-2); i++)
        {
            count += 2;
            trHight -= d1;

            while (d1)
            {
                for (size_t j = 0; j < (trWidth / 2 - i -1); j++)
                {
                    printf(" ");
                }
                for (size_t j = 0; j < count; j++)
                {
                    printf("*");

                }
                printf("\n");
                d1--;
            }
            d1 = equalLine;
        }
        for (size_t i = 0; i < trWidth; i++)
        {
            printf("*");
        }
        printf("\n");
    }
    main();

    return 0;
}
