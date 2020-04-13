import { Router } from '@angular/router';
import { Location, APP_BASE_HREF } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponentTest', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/getbook' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show home', async(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
    });
  }));

  it('should show categories page', async(() => {
    router.navigate(['categories']).then(() => {
      expect(location.path()).toBe('/categories');
    });
  }));

  it('should show empty category form', async(() => {
    router.navigate(['categories', 'form']).then(() => {
      expect(location.path()).toBe('/categories/form');
    });
  }));

  it('should show form with category', async(() => {
    router.navigate(['categories', 'form', 1]).then(() => {
      expect(location.path()).toBe('/categories/form/1');
    });
  }));

  it('should show authors page', async(() => {
    router.navigate(['authors']).then(() => {
      expect(location.path()).toBe('/authors');
    });
  }));

  it('should show empty author form', async(() => {
    router.navigate(['authors', 'form']).then(() => {
      expect(location.path()).toBe('/authors/form');
    });
  }));

  it('should show form with author', async(() => {
    router.navigate(['authors', 'form', 1]).then(() => {
      expect(location.path()).toBe('/authors/form/1');
    });
  }));

  it('should show books page', async(() => {
    router.navigate(['books']).then(() => {
      expect(location.path()).toBe('/books');
    });
  }));

  it('should show empty book form', async(() => {
    router.navigate(['books', 'form']).then(() => {
      expect(location.path()).toBe('/books/form');
    });
  }));

  it('should show form with book', async(() => {
    router.navigate(['books', 'form', 1]).then(() => {
      expect(location.path()).toBe('/books/form/1');
    });
  }));

});
