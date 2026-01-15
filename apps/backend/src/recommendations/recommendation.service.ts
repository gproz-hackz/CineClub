import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

  async getRecommendations(userId: string) {
    // 1. Get user's last 10 interactions
    const history = await this.prisma.activityLog.findMany({
      where: { userId, action: 'VIEW' },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    // 2. Extract Genres (Simplified simulation)
    // In production, you would fetch metadata for these history items
    const preferredGenres = ['Action', 'Sci-Fi']; // Mocked derivation

    // 3. Query DB for similar items not in history
    const recommendations = await this.prisma.movie.findMany({
      where: {
        genres: { hasSome: preferredGenres },
      },
      orderBy: { popularity: 'desc' },
      take: 20
    });

    return recommendations;
  }
}
