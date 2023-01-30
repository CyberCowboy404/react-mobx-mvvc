import BooksController from './BooksPage.ctrl';
import BooksModel from './BooksPage.model';

const publicBooksMock = [
  {
    id: 111,
    name: 'Wind in the willows',
    ownerId: 'postnikov',
    author: 'Kenneth Graeme',
  },
  {
    id: 121,
    name: 'I, Robot',
    ownerId: 'postnikov',
    author: 'Isaac Asimov',
  },
];

const privateBooksMock = [
  {
    id: 444,
    name: 'Private',
    ownerId: 'postnikov',
    author: 'Kenneth Graeme',
  },
  {
    id: 333,
    name: 'Private',
    ownerId: 'tester',
    author: 'Isaac Asimov',
  },
];

describe('BooksController', () => {
  let controller;

  beforeEach(() => {
    controller = new BooksController({ user: {} });
  });

  it('should init controller with default values', () => {
    expect(controller.publicBooks).toEqual([]);
    expect(controller.privateBooks).toEqual([]);
    expect(controller.isLoading).toEqual(false);
    expect(controller.isPrivate).toEqual(false);
    expect(controller.isPublic).toEqual(true);
    expect(controller.error).toEqual(null);
  });

  describe('getPublicBooks', () => {
    it('should set loading to false when requst started', () => {
      expect(controller.isLoading).toEqual(false);
      controller.getPublicBooks();
      expect(controller.isLoading).toEqual(true);
    });

    it('should properly get public books', async () => {
      controller.model.getPublicBooks = jest
        .fn()
        .mockResolvedValue(publicBooksMock);

      expect(controller.isLoading).toEqual(false);
      await controller.getPublicBooks();

      expect(controller.publicBooks).toEqual(publicBooksMock);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(true);
      expect(controller.isPrivate).toEqual(false);
    });

    it('should return existed books instead request', async () => {
      controller.model.getPublicBooks = jest.fn();
      controller.publicBooks = publicBooksMock;

      expect(controller.isLoading).toEqual(false);
      await controller.getPublicBooks();

      expect(controller.model.getPublicBooks).toHaveBeenCalledTimes(0);
      expect(controller.publicBooks).toEqual(publicBooksMock);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(true);
      expect(controller.isPrivate).toEqual(false);
    });

    it('should return error on request', async () => {
      const error = { error: true };
      controller.model.getPublicBooks = jest.fn().mockImplementation(() => {
        throw error;
      });

      expect(controller.isLoading).toEqual(false);
      await controller.getPublicBooks();

      expect(controller.model.getPublicBooks).toHaveBeenCalledTimes(1);
      expect(controller.publicBooks).toEqual([]);
      expect(controller.error).toEqual(error);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(true);
      expect(controller.isPrivate).toEqual(false);
    });
  });

  describe('getPrivateBooks', () => {
    it('should set loading to false when requst started', () => {
      expect(controller.isLoading).toEqual(false);
      controller.getPrivateBooks();
      expect(controller.isLoading).toEqual(true);
    });

    it('should properly get private books', async () => {
      controller.model.getPrivateBooks = jest
        .fn()
        .mockResolvedValue(privateBooksMock);

      expect(controller.isLoading).toEqual(false);
      await controller.getPrivateBooks();

      expect(controller.privateBooks).toEqual(privateBooksMock);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(false);
      expect(controller.isPrivate).toEqual(true);
    });

    it('should return existed books instead request', async () => {
      controller.model.getPrivateBooks = jest.fn();
      controller.privateBooks = privateBooksMock;

      expect(controller.isLoading).toEqual(false);
      await controller.getPrivateBooks();

      expect(controller.model.getPrivateBooks).toHaveBeenCalledTimes(0);
      expect(controller.privateBooks).toEqual(privateBooksMock);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(false);
      expect(controller.isPrivate).toEqual(true);
    });

    it('should return error on request', async () => {
      const error = { error: true };
      controller.model.getPrivateBooks = jest.fn().mockImplementation(() => {
        throw error;
      });

      expect(controller.isLoading).toEqual(false);
      await controller.getPrivateBooks();

      expect(controller.model.getPrivateBooks).toHaveBeenCalledTimes(1);
      expect(controller.publicBooks).toEqual([]);
      expect(controller.error).toEqual(error);
      expect(controller.isLoading).toEqual(false);
      expect(controller.isPublic).toEqual(false);
      expect(controller.isPrivate).toEqual(true);
    });
  });

  it('should set private to true when calling setPrivate', () => {
    controller.setPrivate();
    expect(controller.isPublic).toEqual(false);
    expect(controller.isPrivate).toEqual(true);
  });

  it('should set public to true when calling setPublic', () => {
    controller.setPublic();
    expect(controller.isPublic).toEqual(true);
    expect(controller.isPrivate).toEqual(false);
  });

  it('should call showPrivate and properly return value', () => {
    controller.isPrivate = true;
    controller.isLoading = false;
    expect(controller.showPrivate).toEqual(true);

    controller.isPrivate = true;
    controller.isLoading = true;
    expect(controller.showPrivate).toEqual(false);

    controller.isPrivate = false;
    controller.isLoading = false;
    expect(controller.showPrivate).toEqual(false);
  });

  it('should call showPublic and properly return value', () => {
    controller.isPublic = true;
    controller.isLoading = false;
    expect(controller.showPublic).toEqual(true);

    controller.isPublic = true;
    controller.isLoading = true;
    expect(controller.showPublic).toEqual(false);

    controller.isPublic = false;
    controller.isLoading = false;
    expect(controller.showPublic).toEqual(false);
  });

  it('isCurrent should properly return values', () => {
    expect(controller.isCurrent()).toEqual('');
    expect(controller.isCurrent(true)).toEqual('books-page--switcher__current');
  });

});
