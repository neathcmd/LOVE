import { BookOpen, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ReactNode } from "react";

interface ChapterCardProps {
  title: string;
  date: string;
  content: ReactNode;
}

const StoriesEN = () => {
  const { theme } = useTheme();

  const ChapterCard = ({ title, date, content }: ChapterCardProps) => (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl mb-8 transform transition-all duration-300 hover:scale-[1.01] ${
        theme === "dark"
          ? "bg-opacity-10 shadow-gray-900 hover:shadow-pink-900/20"
          : "bg-opacity-50 shadow-gray-200 hover:shadow-pink-500/20"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-300 ${
              theme === "dark" ? "bg-pink-900" : "bg-pink-100"
            }`}
          >
            <BookOpen
              className={`transition-all duration-300 ${
                theme === "dark" ? "text-pink-300" : "text-pink-600"
              }`}
              size={20}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {title}
            </h2>
            <div className="flex items-center">
              <Calendar
                size={16}
                className={`${
                  theme === "dark" ? "text-pink-400" : "text-pink-600"
                }`}
              />
              <p
                className={`ml-2 text-base font-medium ${
                  theme === "dark" ? "text-pink-300" : "text-pink-600"
                }`}
              >
                {date}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`prose lg:prose-lg ${
            theme === "dark" ? "prose-invert" : ""
          } max-w-none`}
        >
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="container max-w-4xl mx-auto px-6 pb-24">
        <ChapterCard
          title="Chapter 1: The Day It All Began"
          date="February 16, 2025"
          content={
            <>
              <p className="text-lg leading-relaxed">
                The Day Everything Began:
              </p>

              <p className="text-lg leading-relaxed mt-4">
                It was Saturday, February 15th a typical weekend at the school
                library. The day was filled with laughter, funny jokes from all
                the volunteers, and a joyful atmosphere that made everything
                feel light and cheerful. It truly was a wonderful weekend. As
                closing time approached, most of the volunteers had already
                left. Only two of us stayed behind to tidy up the place me and a
                girl. She was kind, helpful, and what stood out the most was how
                she liked to do everything on her own, just like I used to be.
                We worked side by side, finishing up the last tasks of the day.
                While we we tidy up
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She said that the next day, Sunday, February 16th, 2025, there
                would be a psychology class held in the library for the entire
                morning. Because of that, we needed to open the library earlier
                than usual unlike our typical schedule where we only opened on
                Saturdays. She asked me to help her prepare. At first, I
                hesitated, but when she explained that she'd be alone and needed
                someone else to help oversee things, I agreed. I promised her I
                would come.
              </p>

              <p className="text-lg leading-relaxed mt-4 italic">
                "I never imagined that this day would change our relationship so
                much…"
              </p>

              <p className="text-lg leading-relaxed mt-4">
                On the morning of February 16th, at exactly 7:20 a.m., I arrived
                as promised. I saw her there first and asked,{" "}
                <span className="italic">
                  "Oh, you're here already? Even earlier than me."
                </span>{" "}
                She smiled and said,{" "}
                <span className="italic">
                  "I thought maybe you wouldn't come."
                </span>{" "}
                I replied with a shy laugh,{" "}
                <span className="italic">
                  "How could I not come after making a promise?"
                </span>{" "}
                We then started arranging the room to be ready in time for the
                class. While the psychology session was happening, we sat and
                chatted, getting to know each other more. But I sensed that
                something was bothering her. She seemed different like she was
                holding back some kind of sadness. Curious and concerned, I
                gently asked her,{" "}
                <span className="italic">
                  "Is something bothering you? You don't look happy and cheerful
                  today."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She looked at me and asked,{" "}
                <span className="italic">
                  "Would you be upset if I told you?"
                </span>{" "}
                I replied,{" "}
                <span className="italic">
                  "It's okay I don't mind You can tell me."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                After a moment of hesitation, she finally said,{" "}
                <span className="italic">
                  "Actually… I have a boyfriend. But he doesn't really treat me
                  well. He keeps hurting my feelings over and over again. That's
                  why I've been feeling so down lately…"
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                I listened to her with empathy. I understood her, I had
                experienced something similar myself. So I decided to stay by
                her side, talk to her, and try to lift her spirits.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                After a little while, she asked with a soft smile,{" "}
                <span className="italic">
                  "Can we take a photo together? I've never had anyone take a
                  photo with me as a couple before..."
                </span>{" "}
                Seeing her warm expression, I agreed. After we took the picture,
                she said,
                <span className="italic">
                  "I'm really happy. I'm glad there's someone who's willing to
                  listen to me without judging… someone like you."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At the time, I didn't think too deeply about it. I just thought
                it was a simple, kind moment.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At around 11:15 a.m., the class ended. All the students and the
                teacher had already left only the two of us remained. I saw her
                cleaning up, so I decided to stay and help, out of genuine care.
                She told me,{" "}
                <span className="italic">
                  "It's okay, I can clean by myself. You can go."
                </span>{" "}
                But I replied,{" "}
                <span className="italic">
                  "It's fine I'll stay and help. I'm doing this from the bottom
                  of my heart."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She smiled with appreciation, and we continued cleaning
                together. I then asked her,{" "}
                <span className="italic">"Do you like coffee?"</span> She
                answered, <span className="italic">"Yes, I do!"</span> So I
                said,{" "}
                <span className="italic">
                  "Once we're done cleaning, I'd like to take you to a café.
                  Would you be okay with that?"
                </span>{" "}
                She hesitated slightly, but eventually agreed, with a shy smile.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At 11:30 a.m., we went to the café together. We sat down, talked
                about our feelings and daily life, and shared laughter and
                smiles her beautiful smile glowing throughout. It was a warm and
                peaceful moment, just before we went our separate ways...
              </p>

              <p className="text-lg leading-relaxed mt-4">
                From that moment, I found myself thinking about her all the
                time. I didn't know what this feeling was a strange mix of
                wanting and missing. I wanted to see her face every day, to be
                close to her, but we were like strangers. If I went a day
                without seeing her, I felt empty inside. I kept asking myself,
                Am I in love? Her beautiful smile, her joyful laughter stayed in
                my mind. But even with all these feelings, I never found a clear
                answer.
              </p>

              <div className="flex justify-center my-8">
                <div
                  className={`h-px w-1/3 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <p className="text-lg leading-relaxed mt-4 italic">
                "From that moment, the connection between us started to grow.
                From just strangers slowly became two hearts getting closer
                together."
              </p>
            </>
          }
        />

        <ChapterCard
          title="Chapter 2: Everything Started To Change"
          date="March 24, 2025"
          content={
            <>
              <p className="text-lg leading-relaxed">
                School Library opening day:
              </p>
              <p className="text-lg leading-relaxed mt-4">
                For weeks, our school had been under maintenance—rooftops were
                being repaired, broken tables replaced, and inspections carried
                out in every corner. During that time, the school library was
                turned into a temporary teachers’ office. Students weren’t
                allowed inside, and for a while, that space—once filled with
                laughter and quiet moments—was closed off to us.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I didn’t even know that I was allowed to go in until she told
                me. “As a library volunteer,” she said with a calm smile,
                “you’re allowed to go in anytime you want.”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Then, on Monday, March 24th, an announcement was made: the
                library would finally reopen. Most students didn’t think much of
                it. But for me, it meant everything. The library had become
                something more—a place tied to a memory, a quiet connection, the
                beginning of something I didn’t yet have words for.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                And from that day on, everything truly began to change.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Every day after 11 a.m., once classes ended, I’d find myself
                walking into the library. She was usually already there—reading,
                waiting, organizing something, or just sitting quietly. Between
                11 and 1, those two hours slowly became a part of my daily life.
                I joke with her, share my studies, and feel very happy when I
                see her beautiful smile, laugh, and do small things together. I
                feel happy in my life.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Sometimes we talked, We jokes, other times we didn’t need to.
                We’d sit near each other in silence, and yet the air between us
                always felt warm. Safe. and Familiar.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                The library wasn't special to most students. Just a room with
                books and chairs. But to me, it was where I have met a wonderful
                woman.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                For months I was just a friend to her. A friend who understand
                everything, Who's know everything understanding her feeling
                knowing her struggle. I'm just a friend who was there for her
                when she needed someone to listen, to care, to be there. I never
                thought of crossing that line, never thought of making it more
                than just friendship. I was just being the person who she could
                rely on, the one who understood her without needing to say much.
                Untill...I corssed that line.
              </p>
            </>
          }
        />

        <ChapterCard
          title="Chapter 3: We Were No Longer Just Friends"
          date="April 06 2025"
          content={
            <div>
              <p className="text-lg leading-relaxed">April 6, 2025</p>
              <p className="text-lg leading-relaxed mt-4">
                On April 6, 2025, We were both tired from a full week of
                studying, so I asked her if she wanted to go to a café near our
                school just to relax and take a break. She said "yes". That day
                felt calm, like a small pause in our busy lives.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Coincidentally, one of my old friends from high school was
                visiting the city. I thought it might be fun to invite him to
                join us hoping to lighten the mood. Then he came we were having
                a great time together he get to know her, She get to know my
                friend. It was a wonderful afternoon.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Everything was going fine until her phone buzzed. She got a text
                from her boyfriend. She looked at me and said “Can you help me
                break up with him? I don’t feel like he's loves me anymore.”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                At first, I thought she was joking. I drafted a breakup message
                but didn’t send it. And then I gave the phone back to her
                thinking she will just laugh and delete it. But without any
                hesitation, she took the phone and pressed send. Just like that.
                I froze, shocked. But then I noticed tears slowly forming in her
                eyes. That’s when I realized it wasn’t just a decision it was
                something she had been holding in for a long time. I pet her
                shoulder slowly. and told her, “It’s okay. If he doesn’t love
                you, it's time to let him go.” She tried to keep it together,
                but her eyes gave it away. I knew how that felt but I didn't say
                anything.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Suddenly, she stood up and ran to the bathroom, slamming the
                door behind her. I sat there with my friend, not knowing what to
                do, assuming she just needed a moment alone. I didn’t realize
                she was crying in there until she came out and told me herself.
                Her eyes were red, but she tried to smile. I knew everything, I
                knew she's hurt inside.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                After a while, my friend left, and it was just the two of us. We
                sat there for hours, not saying much, just sharing the moment.
                Before we parted ways, I pet her head slowly and said, “It's
                okay, be strong and if you ever need anything I'm here.”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I wasn’t sure how much she trusted me, but I knew in my heart,
                I’d always be there for her.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                That day changed everything.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Later that evening, I was on the phone with my girlfriend. But
                something felt off. Her voice, her words everything seemed
                distant. So I asked her directly, “Bebe, you’ve been acting
                strange lately… is there something you’re not telling me?”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                At first, she brushed it off. saying “No, bebe, I’m fine… I’m
                okay.” But I knew she wasn’t. I asked her again and again until
                she finally gave in and said, “Don’t be mad, okay?”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Then came the words that shattered me: “The truth is… I don’t
                feel a connection anymore. I’m back with my ex. I love him… I
                can’t live without him.”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                In that moment, my whole world collapsed. After everything I had
                done for her… after all the love, trust, and effort I gave her
                And she walked away. Just like that. Back to someone who had
                already let her down before.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Then after a painful conversation I decided: it’s okay. If she
                wants to go, I won’t stop her. I let her go. That same night… I
                broke up with my girlfriend.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                A little later, I called the other girl the one who had been by
                my side earlier that day. I told her everything. But then
                something unexpected happened. She told me that she had feelings
                for me too. She had kept them hidden all this time because she
                was scared… scared that I wouldn't take her seriously.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I was quiet for a second and then I told her the truth: “I have
                feelings for you too. I’ve had them for a while.” We talked for
                almost an hour, sharing everything we had been holding back.
                That conversation changed everything.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Then from that day on, after long days filled with school and
                homework, we had a little tradition standing on the balconies of
                our buildings, facing each other. We’d talk on the phone,
                sometimes for hours, while looking at each other from across the
                distance. It was simple, but it meant everything. Even though we
                were separated by just a few floors and a bit of space, it felt
                like we were in our own quiet world. The sound of her voice, the
                sight of her smile across the gap—it made all the stress of the
                day disappear. In those small, peaceful moments, it didn’t
                matter how far apart we were. We felt closer than ever.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default StoriesEN;
