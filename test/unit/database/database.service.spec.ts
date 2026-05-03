import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '@/database/database.service';

describe('DatabaseService', () => {
  let prisma: DatabaseService;

  const mockPrisma = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    onModuleInit: jest.fn(),
    onModuleDestroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: DatabaseService, useValue: mockPrisma }],
    }).compile();

    prisma = module.get<DatabaseService>(DatabaseService);
  });

  describe('is defined', () => {
    it('service should be defined', () => expect(prisma).toBeDefined());
  });

  describe('$connect', () => {
    it('should call $connect', async () => {
      jest.spyOn(prisma, '$connect').mockResolvedValue();
      await prisma.$connect();
      expect(prisma.$connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('$disconnect', () => {
    it('should call $disconnect', async () => {
      jest.spyOn(prisma, '$disconnect').mockResolvedValue();
      await prisma.$disconnect();
      expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
