package com.CSCI4050.jwt.backend;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.context.annotation.Bean;

import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.entites.MovieTime;
import com.CSCI4050.jwt.backend.entites.Review;
import com.CSCI4050.jwt.backend.entites.Theatre;
import com.CSCI4050.jwt.backend.enums.Rating;
import com.CSCI4050.jwt.backend.repositories.MovieRepository;
import com.CSCI4050.jwt.backend.repositories.TheatreRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.entites.MovieTime;
import com.CSCI4050.jwt.backend.entites.Review;
import com.CSCI4050.jwt.backend.enums.Rating;
import com.CSCI4050.jwt.backend.repositories.MovieRepository;


@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	
	// @Bean
	// CommandLineRunner run(@Autowired MovieRepository movieRepo,@Autowired TheatreRepository theatreRepository) {
	// 	return (args) -> {
	// 		createDummyMovies(movieRepo,theatreRepository); 
	// 	};
	// } 
	
	// public void createDummyMovies(MovieRepository movieRepo, TheatreRepository theatreRepository) {
	// 	String[] movieTitles = {
	// 		"Eternal Quest", "Pirates of the Caribbean", "Shadow's Edge",
	// 		"Timeless", "Galactic Pioneers", "Mystery of the Depths",
	// 		"Uncharted Realms", "The Forgotten Era", "Labyrinth of Dreams",
	// 		"Echoes of Tomorrow"
	// 	};

	// 	String[] directors = {
	// 		"John Smith", "Emily Johnson", "Michael Brown",
	// 		"Linda Davis", "James Wilson", "Barbara Moore",
	// 		"Robert Taylor", "Maria Anderson", "Charles Thomas",
	// 		"Jessica Jackson"
	// 	};

	// 	String[] movieTrailerImageURLs = {
	// 		"https://m.media-amazon.com/images/I/415Vq23LkIL._AC_UF1000,1000_QL80_.jpg",
	// 		"https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX671_.jpg",
	// 		"https://m.media-amazon.com/images/M/MV5BZTczZDg0MDItMTI4MC00ZGRiLTk2NzUtZGQ2MDYzYzk2YTMwXkEyXkFqcGdeQXVyNTcyMTgyNjY@._V1_FMjpg_UX1000_.jpg",
	// 		"https://m.media-amazon.com/images/M/MV5BMjA5ODkxODgzMl5BMl5BanBnXkFtZTgwNzA4MTc5NDM@._V1_FMjpg_UX1000_.jpg",
	// 		"https://images.igdb.com/igdb/image/upload/t_original/co4h26.webp",
	// 		"https://m.media-amazon.com/images/M/MV5BNmJhZDY1YzYtMThkYS00ZDNiLWJjMjEtZjU4MmY2NmRiNWFmXkEyXkFqcGdeQXVyNTkzMzg3NDM@._V1_.jpg",
	// 		"https://i1.sndcdn.com/artworks-9IFxJQ6yevwlcOSy-tQ1Wbw-t500x500.jpg",
	// 		"https://images.moviesanywhere.com/259e8d9930b8d9d41ddbc1e7b0e2b7a8/dd46a372-02a3-415a-b92f-94bbdafb4e87.jpg",
	// 		"https://m.media-amazon.com/images/M/MV5BYWU4N2FjZDMtZDVmNi00NjZjLWIyZWUtNmZmYWFiOGFkMjYxXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_.jpg",
	// 		"https://m.media-amazon.com/images/M/MV5BMjM3Njg3NjUyNF5BMl5BanBnXkFtZTgwODg2NzYxNzE@._V1_.jpg"
	// 	};

	// 	String[] trailerVideoURLs = {
	// 		"https://www.youtube.com/watch?v=m6_olJRkq18",
	// 		"https://www.youtube.com/watch?v=cmwqU6R9x9k",
	// 		"https://www.youtube.com/watch?v=p9f33TJN_rM",
	// 		"https://www.youtube.com/watch?v=WXTjc41Tj_I",
	// 		"https://www.youtube.com/watch?v=ngO6Mnmzc8A",
	// 		"https://www.youtube.com/watch?v=oyEIyB2-RVQ",
	// 		"https://www.youtube.com/watch?v=u33Ttb-a47A",
	// 		"https://www.youtube.com/watch?v=omMvU7J8uf8",
	// 		"https://www.youtube.com/watch?v=flr0T_2Kzyg",
	// 		"https://www.youtube.com/watch?v=8wD3AnHpUjE"
	// 	};

	// 	String[] categories = {
	// 		"Adventure", "Sci-Fi", "Fantasy",
	// 		"Drama", "Action", "Mystery",
	// 		"Thriller", "Documentary", "Animation",
	// 		"Comedy"
	// 	};

	// 	Theatre[] theatres = new Theatre[5];
	// 	for (int i = 0 ; i < 5 ; i++) {
	// 		theatres[i]= Theatre.builder()
	// 		.seniorTicketPrice(Double.valueOf(10+i))
	// 		.adultTicketPrice(Double.valueOf(10+i))
	// 		.childTicketPrice(Double.valueOf(10+i))
	// 		.name("Theatre " + i)
	// 		.build();
	// 		theatres[i] = theatreRepository.saveAndFlush(theatres[i]); 
	// 	}

	// 	for (int i = 0; i < 10; i++) {
	// 		MovieTime movieTime1 = new MovieTime();
	// 		movieTime1.setDate(LocalDate.of(2024, 2, (13 + i) % 28 + 1)); // To vary the dates a bit
	// 		movieTime1.setTime(LocalTime.of((2 + i) % 24, 20));
	// 		movieTime1.setTheatre(theatres[i%5]);

	// 		MovieTime movieTime2 = new MovieTime();
	// 		movieTime2.setDate(LocalDate.of(2024, 2, (13 + i) % 28 + 1));
	// 		movieTime2.setTime(LocalTime.of((2 + i) % 24, 50)); // Different time from the first
	// 		movieTime2.setTheatre(theatres[i%5]);

	// 		Review review1 = new Review();
	// 		review1.setAuthor("Author " + (i + 1));
	// 		review1.setReviewContent("Content of review " + (i + 1));

	// 		Review review2 = new Review();
	// 		review2.setAuthor("Author " + (10 - i));
	// 		review2.setReviewContent("Content of review " + (10 - i));

	// 		Movie movie = new Movie();
	// 		movie.setTitle(movieTitles[i]);
	// 		movie.setDescription("Description of " + movieTitles[i]);
	// 		movie.setDirector(directors[i]);
	// 		movie.setSynopsis("Synopsis of " + movieTitles[i]);
	// 		movie.setTrailerPictureURL(movieTrailerImageURLs[i]);
	// 		movie.setTrailerVideoURL(trailerVideoURLs[i]);
	// 		movie.setCategory(categories[i]);
	// 		movie.setReviews(List.of(review1, review2));
	// 		movie.setRating(Rating.values()[(i % Rating.values().length)]); 
	// 		movie.setShowings(List.of(movieTime1, movieTime2));
	// 		movie.setNumStars((i % 5) + 1); // Ratings from 1 to 5
	// 		movie.setComingSoon(i % 2 == 0); // Alternates between coming soon or not

	// 		movieRepo.save(movie);
	// 	}
	// }  
}
