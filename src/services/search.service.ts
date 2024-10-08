import { Injectable } from '@nestjs/common';
import { interval, map, takeUntil, Subject } from 'rxjs';
import { Product } from 'src/types/product';
import { products } from '../data/products';
import { SearchGateway } from 'src/gateways/search.gateway';
import { faker } from '@faker-js/faker';

@Injectable()
export class SearchService {
  private products: Product[];

  constructor(private readonly searchGateway: SearchGateway) {
    this.products = products;
  }

  start(query: string) {
    const queryWords = query.split(' ');
    const regex = new RegExp(queryWords.join('|'), 'ig');
    const filteredProducts = this.products.filter(
      ({ name, description }) => regex.test(name) || regex.test(description),
    );

    const errorInterval = faker.number.int({ min: 0, max: 9 });
    console.log(`Error interval: ${errorInterval}`);
    const firstResponseInterval = faker.number.int({ min: 2, max: 6 });
    const secondResponseInterval = faker.number.int({
      min: firstResponseInterval + 4,
      max: 19,
    });

    console.log(
      `Message interval 1: ${firstResponseInterval}, interval 2: ${secondResponseInterval}`,
    );

    const firstHalf = filteredProducts.slice(
      0,
      Math.floor(filteredProducts.length / 2),
    );
    const secondHalf = filteredProducts.slice(
      Math.floor(filteredProducts.length / 2),
    );

    const stop$ = new Subject<void>();

    const response = interval(1000)
      .pipe(takeUntil(stop$))
      .pipe(
        map((count) => {
          const loadingMesage = {
            status: 'loading',
          };

          switch (count) {
            case firstResponseInterval: {
              const message = {
                status: 'success',
                data: firstHalf,
              };

              this.searchGateway.server.emit('search', message);
              console.log(message);

              return count;
            }
            case secondResponseInterval: {
              const message = {
                status: 'success',
                data: secondHalf,
              };
              this.searchGateway.server.emit('search', message);
              console.log(message);
              return count;
            }
            default:
              this.searchGateway.server.emit('search', loadingMesage);
              console.log(loadingMesage);
              return count;
          }
        }),
      );

    response.subscribe({
      next: (count) => {
        if (errorInterval === 7 && count === firstResponseInterval - 1) {
          const errorMessage = {
            status: 'error',
            message: 'There has been an error!',
          };
          this.searchGateway.server.emit('search', errorMessage);
          console.log(errorMessage);

          stop$.next();
          stop$.complete();
        }

        if (filteredProducts.length && count === secondResponseInterval) {
          stop$.next();
          stop$.complete();
        }

        if (!filteredProducts.length && count === firstResponseInterval) {
          stop$.next();
          stop$.complete();
        }
      },
      complete: () => {
        const completeMessage = {
          status: 'complete',
        };
        this.searchGateway.server.emit('search', completeMessage);
      },
    });
  }
}
